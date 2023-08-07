from flask import jsonify
import requests
from bs4 import BeautifulSoup
import json

def check_class_existence(soup, class_name):
    elements = soup.find_all(class_=class_name)
    if elements:
        return True
    else:
        return False

def news():
    url = "https://ju.edu.et/"
    class_names = ["media-body rtin-content-area", "media-body rtin-content-area", "media-body rtin-content-area",
                   "media-body rtin-content-area"]
    file_name = "scraped_news.json"
    link_status = "no"  # Initialize link_status variable

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for any HTTP errors

        html_content = response.text

        soup = BeautifulSoup(html_content, 'html.parser')

        scraped_news = []
        broken_links = []
        elements = []
        for class_name in class_names:
            if check_class_existence(soup, class_name):
                print("Here")
                elements = soup.find_all(class_=class_name)
            else:
                broken_links.append(class_name)
            if(len(broken_links) > 0):
                    
                link_status = f"Users unable to access updated News due to some links are broken,Please Check !!"
                print("Some links are broken")
                with open("status/link_news.txt", 'w') as file:
                    file.write(link_status) 
            if(len(broken_links) == 0):
                link_status = "no"
                with open("status/link_news.txt", 'w') as file:
                    file.write(link_status) 
                    
            for element in elements:
                data = {}
                title_element = element.find('h3')
                description_element = element.find('p')
                anchor_elements = element.find_all('a')
                data_elements = element.find('div', class_='rtin-date')

                if title_element and description_element and anchor_elements and data_elements:
                    data['title'] = title_element.text.strip()
                    data['description'] = description_element.text.strip()
                    data['dates'] = data_elements.text.strip()
                    data['url'] = [anchor['href'] for anchor in anchor_elements]  # Extract href from each anchor element

                    scraped_news.append(data)
                else:
                    broken_links.append(class_name)


        json_data = json.dumps(scraped_news, indent=4)

        with open(file_name, 'w') as file:
            file.write(json_data)
   
        with open("scraped_news.json", "r") as file:
            data = json.load(file)
            
        unique_data = []
        title_set = set()
        for item in data:
            if item['title'] not in title_set:
                
                unique_data.append(item)
                title_set.add(item['title'])

        json_data = json.dumps(unique_data)
            
        with open(file_name, 'w') as file:
            file.write(json_data)
        with open("scraped_news.json", "r") as file:
            data = json.load(file)   
        results = []
        for entry in data:
            title = entry["title"]
            description = entry["description"]
            dates = entry["dates"]
            url = entry["url"][0]  # Assuming there is only one URL per entry
        
            result = {
                "title": title,
                "description": description,
                "url": url,
                "dates":dates,
                "connection":"yes"
                }
            results.append(result)
        link_status = f"no"
        print("Server Not respond")
        with open("status/server.txt", 'w') as file:
            file.write(link_status) 

        return (results)

    except requests.exceptions.RequestException as e:
        with open("scraped_news.json", "r") as file:
            data = json.load(file)
        link_status = f"JU Server is not working, User is unable to access updated news Please Check !!"
        print("Server Not respond")
        with open("status/server.txt", 'w') as file:
            file.write(link_status) 
        results = []
        for entry in data:
            title = entry["title"]
            description = entry["description"]
            dates = entry["dates"]
            url = entry["url"][0]  # Assuming there is only one URL per entry
        
            result = {
             "title": title,
             "description": description,
             "url": url,
             "dates":dates,
             "connection":"no"
             }
            results.append(result)
        return (results)
