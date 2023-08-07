import requests
from bs4 import BeautifulSoup
import json
def check_class_existence(soup, class_name):
    elements = soup.find_all(class_=class_name)
    if elements:
        return True
    else:
        return False

def events():
    try:
        response = requests.get("https://ju.edu.et/all-events/")
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        div_elements = soup.find_all('div', class_='media rtin-item')
        divs = soup.find_all('div', class_='media-body rtin-right')
        data = []

        if len(divs) > 0:
            for div in divs:
                paragraph = div.find('p', class_='rtin-content').text
                title = div.find('h3').text
                time = div.find('li', class_='rtin-time').text
                url = div.find('a')['href']

                data.append({
                    'title': title,
                    'description': paragraph,
                    'url': url,
                    'dates': time,
                    'connection':'yes'
                })
            
    
            with open('scraped_events.json', 'w') as f:
                json.dump(data, f)

            with open("scraped_events.json", "r") as file:
                data = json.load(file)
            results = []

            for entry in data:
                title = entry["title"]
                description = entry["description"]
                dates = entry["dates"]
                url = entry["url"]

                result = {
                    "title": title,
                    "description": description,
                    "url": url,
                    "dates": dates,
                    "connection":'yes'

                }
                results.append(result)
                
            link_status = "no"
            print("No broken")
            with open("status/link_events.txt", 'w') as file:
                file.write(link_status) 
            link_status = f"no"
            print("Server Not respond")
            with open("status/server_events.txt", 'w') as file:
                file.write(link_status) 
            return results

        else:
            link_status = f"Users unable to access updated Events due to some links are broken,Please Check !!"
            print("Some links are broken")
            with open("status/link_events.txt", 'w') as file:
                file.write(link_status) 
                
            if len(div_elements) > 0:
                for div_element in div_elements:
                    text = div_element.text.strip()

                data = {'noevent': text}

                with open('scraped_events.json', 'w') as file:
                    json.dump(data, file)

                with open("scraped_events.json", "r") as file:
                    data = json.load(file)

                results = {'noevent': data['noevent'], 'connection':'yes'}
                print(results)
                link_status = "no"
                print("Some No broken link")
                with open("status/link_events.txt", 'w') as file:
                    file.write(link_status) 
                return results

            else:
                results= []
                data = [{'noevent': 'No Events Available'}, {'connection': 'yes'}]
                no_event_value = data[0]['noevent']
                connection_value = data[1]['connection']
                # results = {'noevent': data['noevent'], 'connection':'yes'}
                results = {'noevent': no_event_value, 'connection': connection_value}
                link_status = f"Users unable to access updated Events due to some links are broken,Please Check !!"
                print("Some links are broken div element")
                with open("status/link_events.txt", 'w') as file:
                    file.write(link_status) 
                print("No events available.")
                return results

    except requests.exceptions.RequestException as e:
        print("No networks available.")
        link_status = f"JU Server is not working, User is unable to access updated Events Please Check !!"
        print("Server Not respond")
        with open("status/server_events.txt", 'w') as file:
            file.write(link_status) 
        with open("scraped_events.json", "r") as file:
            data = json.load(file)

        if len(data) > 1:
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
                    "dates": dates,
                    'connection':'no'

                }
                results.append(result)

            return results

        else:
            with open("scraped_events.json", "r") as file:
                data = json.load(file)

            results = {'noevent': data['noevent'], 'connection':'no'}
#             print(results)
            return results

