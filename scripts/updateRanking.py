import json
import requests
from bs4 import BeautifulSoup

file_path = './datas/ranking.json'

ranking = []

select_img = 'div.li_inner > div.list_img > a > img'
select_brand = 'div.article_info > p.item_title > a'
select_name = 'div.article_info > p.list_info > a'
select_price = 'div.article_info > p.price'

url ="https://www.musinsa.com/ranking/best?period=day"

response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    list = soup.select('#goodsRankList > li > div.li_inner')[0: 10]

def remove_del (): 
    if(item.select_one('div.article_info > p.price > del')) :
        unwanted = item.select_one('div.article_info > p.price > del')
        unwanted.extract()

for item in list:
    remove_del()
    img = item.select_one(select_img)['data-original']
    brand = item.select_one(select_brand).text
    name = item.select_one(select_name)['title']
    price = item.select_one(select_price).text.strip()
    link = item.select_one(select_name)['href']
    ranking.append({"img": img, "brand": brand, "name": name, "price": price, "link": link})


with open(file_path, 'w') as outfile:
    json.dump(ranking, outfile, indent=2, ensure_ascii=False)
