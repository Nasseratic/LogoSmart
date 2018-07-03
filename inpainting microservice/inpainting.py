import config 
import cv2
import jwt
from bottle import route , request , run, abort , get , static_file 
import base64
import sys
import mdb
import json

#----------------------------Auth----------------------------------

class AuthorizationError(Exception):
    """ A base class for exceptions used by bottle. """
    pass
 
def jwt_token_from_header():
    auth = request.headers['Authorization']
    if not auth:
        raise AuthorizationError({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'})
 
    parts = auth.split()

    if parts[0].lower() != 'bearer':
        raise AuthorizationError({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'})
    elif len(parts) == 1:
        raise AuthorizationError({'code': 'invalid_header', 'description': 'Token not found'})
    elif len(parts) > 2:
        raise AuthorizationError({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'})
 
    return parts[1]

def requires_auth(f):
    """Provides JWT based aut hentication for any decorated function assuming credentials available in an "Authorization" header"""
    def decorated(*args, **kwargs):
        try:
            token = jwt_token_from_header()
        except AuthorizationError:
            abort(400, {'code':'unkown error'})
 
        try:
            token_decoded = jwt.decode(token, config.jwtsecret )    # throw away value
        except jwt.ExpiredSignature :
            abort(401, {'code': 'token_expired', 'description': 'token is expired'})
        except jwt.DecodeError:
            abort(401, {'code': 'token_invalid'})
 
        return f(*args, **kwargs)
 
    return decorated

def get_jwt_payload():
    # get and decode the current token
    token = jwt_token_from_header()
    credentials = jwt.decode(token, config.jwtsecret)
    return credentials

##################################################################



#--------------------------HELPERS--------------------------------

def save_base64(b64_string,path):
    with open( path, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))

##################################################################



#---------------------------APP-----------------------------------

@route('/', method='POST')
@requires_auth
def uploadBase64():
    user = get_jwt_payload()
    data = json.load(request.body)
    
    log_id = str( mdb.add_log({
        "userId": user['_id'],
        "action": "inpaint",
        "usage  ": sys.getsizeof(data)
    }).inserted_id )

    image_path = 'original/'+ log_id +'.jpg'
    mask_path = 'mask/'+ log_id +'_mask.jpg'
    save_base64( data['image'].split(',')[1] , image_path)
    save_base64( data['mask'].split(',')[1] , mask_path)

    img = cv2.imread(image_path)
    mask = cv2.imread(mask_path,0)
    dst = cv2.inpaint(img,mask,3,cv2.INPAINT_TELEA)

    cv2.imwrite('result/'+ log_id +'.jpg',dst)

    host = request.get_header('host')

    return { 'url': ('http://{}/result/{}.jpg').format(host,log_id) }


@get("/result/<filepath:re:.*\.(jpg|png)>")
def img(filepath):
    return static_file(filepath, root="result")


run(host='localhost', port=8080)

###################################################################