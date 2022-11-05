export const storeModel = (latitude, longitude, phone, image_url, address, city, 
    country, name) => ({
      "coordinates":  {
        "latitude": latitude,
        "longitude": longitude,
        
      },
      "image_url": image_url,
      "is_closed": false,
      "location":  {
        "address1": address,
        "address2": "",
        "address3": null,
        "city": city,
        "country": country,
        "display_address":  [
          address,
          "",
          "",
        ],
        "state": "",
        "zip_code": "",
      },
      "name": name,
      "phone": phone,
      "price": "$$",
      "transactions":  [
        "pickup",
        "delivery",
      ],
      deliveryTime:15,
      collectTime:5,
    })