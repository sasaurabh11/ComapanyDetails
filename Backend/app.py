from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

client = MongoClient(os.getenv("MONGODBURL"))

db = client['companyDataBase']

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/companies', methods=['POST', 'GET'])
def data():

    if(request.method == 'POST'):
        body = request.json
        CompanyName = body['CompanyName']
        Revenue = body['Revenue']
        FoundedYear = body['FoundedYear']
        KeyWords = body['KeyWords']
        Location = body['Location']
        CompanyEmailID = body['CompanyEmailID']

        db['company'].insert_one({
            "CompanyName":CompanyName,
            "Revenue":Revenue,
            "FoundedYear":FoundedYear,
            "KeyWords":KeyWords,
            "Location":Location,
            "CompanyEmailID":CompanyEmailID
        })

        return jsonify({
            'status':'Data is Inteserted in Database',
            "CompanyName":CompanyName,
            "Revenue":Revenue,
            "FoundedYear":FoundedYear,
            "KeyWords":KeyWords,
            "Location":Location,
            "CompanyEmailID":CompanyEmailID
        })
    
    if(request.method == 'GET'):
        allCompanyData = db['company'].find()
        dataJson = []
        for data in allCompanyData:
            id = data['_id']
            CompanyName = data['CompanyName']
            Revenue = data['Revenue']
            FoundedYear = data['FoundedYear']
            KeyWords = data['KeyWords']
            Location = data['Location']
            CompanyEmailID = data['CompanyEmailID']

            dataDict = {
                "id":str(id),
                "CompanyName":CompanyName,
                "Revenue":Revenue,
                "FoundedYear":FoundedYear,
                "KeyWords":KeyWords,
                "Location":Location,
                "CompanyEmailID":CompanyEmailID
            }

            dataJson.append(dataDict)

        return jsonify(dataJson)
    
@app.route('/companies/location', methods=['GET'])
def get_companies():
    location_filter = request.args.get('location')
    query = {}
    if location_filter:
        query['Location'] = location_filter

    filtered_companies = db['company'].find(query)

    dataJson = []
    for data in filtered_companies:
        id = data['_id']
        CompanyName = data['CompanyName']
        Revenue = data['Revenue']
        FoundedYear = data['FoundedYear']
        KeyWords = data['KeyWords']
        Location = data['Location']
        CompanyEmailID = data['CompanyEmailID']

        dataDict = {
            "id": str(id),
            "CompanyName": CompanyName,
            "Revenue": Revenue,
            "FoundedYear": FoundedYear,
            "KeyWords": KeyWords,
            "Location": Location,
            "CompanyEmailID": CompanyEmailID
        }

        dataJson.append(dataDict)

    return jsonify(dataJson)

@app.route('/companies/search', methods=['GET'])
def search_companies():
    search_query = request.args.get('query')
    if not search_query:
        return jsonify({'error': 'No search query provided'}), 400

    # Search for companies based on the search query
    search_results = db['company'].find({'$text': {'$search': search_query}})

    dataJson = []
    for data in search_results:
        id = data['_id']
        CompanyName = data['CompanyName']
        Revenue = data['Revenue']
        FoundedYear = data['FoundedYear']
        KeyWords = data['KeyWords']
        Location = data['Location']
        CompanyEmailID = data['CompanyEmailID']

        dataDict = {
            "id": str(id),
            "CompanyName": CompanyName,
            "Revenue": Revenue,
            "FoundedYear": FoundedYear,
            "KeyWords": KeyWords,
            "Location": Location,
            "CompanyEmailID": CompanyEmailID
        }

        dataJson.append(dataDict)

    return jsonify(dataJson)

if __name__ == '__main__':
    app.run(debug=True, port=8000)