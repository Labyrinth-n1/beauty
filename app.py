import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
from urllib.parse import urljoin


app = Flask(__name__)
CORS(app)

@app.route('/products', methods=['GET'])
def get_products():
    url = "https://www.lookfantastic.fr/health-beauty/face.list?utm_medium=affiliate&utm_source=AWin_553441&utm_campaign=AffiliateWin&utm_content=http://les10meilleurs.net/&awc=7496_1737917427_3670f377c0d464437c3d48228ac5f732"
    
    class_title = "productBlock_productName"
    class_price = "productBlock_priceValue"
    class_link = "productBlock_link"
    class_image = "productBlock_image"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        beauty = []

        titles = soup.find_all(class_=class_title)
        prices = soup.find_all(class_=class_price)
        links = soup.find_all(class_=class_link)
        images = soup.find_all(class_=class_image)

        for title, price, link, image in zip(titles, prices, links, images):
            real_price = price.get_text(strip=True)
            new_price = float(real_price.replace(",", ".").replace("€", ""))

            
            image_url = urljoin(url, image.get('src'))


            beauty.append({
                'Nom du produit': title.get_text(strip=True),
                'Prix': new_price,
                'Lien': link.get('href'),
                'Image': image_url,
            })

        return jsonify(beauty)
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
