with open("link_news.txt", 'r') as file:
    data = file.read()
if(len(data) == 0):
    print("No link")
