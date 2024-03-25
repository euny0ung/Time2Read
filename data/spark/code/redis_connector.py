import redis

def get_redis():
    return redis.StrictRedis(host='j10b307a.p.ssafy.io', port=6379, db=0)

def is_contain_key(rd, key):
    return rd.exists(key)

def set_key(rd, key):
    rd.set(key, "true")

def delete_key(rd, key):
    rd.delete(key)