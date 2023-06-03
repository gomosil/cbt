def generate_random_url():
    length = 10
    characters = string.ascii_letters + string.digits
    random_url = ''.join(random.choice(characters) for _ in range(length))
    return random_url
