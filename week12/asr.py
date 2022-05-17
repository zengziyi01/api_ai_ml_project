import sys
import json
import time

IS_PY3 = sys.version_info.major == 3

from urllib.request import urlopen
from urllib.request import Request
from urllib.error import URLError
from urllib.parse import urlencode
timer = time.perf_counter
SCOPE = 'audio_voice_assistant_get' 
TOKEN_URL = 'http://aip.baidubce.com/oauth/2.0/token'
# 获取access_token
def fetch_token(API_KEY,SECRET_KEY):
    params = {'grant_type': 'client_credentials',
              'client_id': API_KEY,
              'client_secret': SECRET_KEY}
    post_data = urlencode(params)
    if (IS_PY3):
        post_data = post_data.encode('utf-8')
    req = Request(TOKEN_URL, post_data)
    try:
        f = urlopen(req)
        result_str = f.read()
    except URLError as err:
        print('token http response http code : ' + str(err.code))
        result_str = err.read()
    if (IS_PY3):
        result_str = result_str.decode()

#     print(result_str)
    result = json.loads(result_str)
#     print(result)
    
    if ('access_token' in result.keys()):
        return result['access_token']
    else:
        raise DemoError('MAYBE API_KEY or SECRET_KEY not correct: access_token or scope not found in token response')



def asr(token,AUDIO_FILE='1.wav',CUID='123456PYTHON',RATE=16000,DEV_PID=1537):
    speech_data = []
    # 打开目标语音文件
    with open(AUDIO_FILE, 'rb') as speech_file:
        speech_data = speech_file.read()
    length = len(speech_data)
    if length == 0:
        raise DemoError('file %s length read 0 bytes' % AUDIO_FILE)

    params = {
        'cuid': CUID, 
        'token': token, 
        'dev_pid': DEV_PID
    }
    #测试自训练平台需要打开以下信息
    #params = {'cuid': CUID, 'token': token, 'dev_pid': DEV_PID, 'lm_id' : LM_ID}
    params_query = urlencode(params);
    FORMAT=AUDIO_FILE[-3:]
    headers = {
        'Content-Type': 'audio/' + FORMAT + '; rate=' + str(RATE),
        'Content-Length': length
    }

    url = 'http://vop.baidu.com/server_api' + "?" + params_query
    SCOPE = 'audio_voice_assistant_get' 
    # print post_data
    req = Request('http://vop.baidu.com/server_api' + "?" + params_query, speech_data, headers)
    # 异常处理，避免出现红色的bug（提前预判可能出现的异常）
    try:
        begin = timer()
        f = urlopen(req)
        result_str = f.read()
    #         print("Request time cost %f" % (timer() - begin))
    except  URLError as err:
        print('asr http response http code : ' + str(err.code))
        result_str = err.read()

    if (IS_PY3):
        result_str = str(result_str, 'utf-8') # result_str 已经是字符串（字典）
    #    print(eval(result_str)["result"][0][:-1]) # eval()将str --> dict
#     print(qa.get(eval(result_str)["result"][0][:-1]))
    with open("result.txt", "w") as of:
        of.write(result_str)
    return result_str