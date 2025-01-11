This Backend api consist of 3 routes `/coins`,`/stats` and `/deviation` this backend is using MongoDB for storing the coin details.

- `/coins` route will gets the information about the mentioned coins by using the coingecko api and add's them into the database.

<img width="1008" alt="image" src="https://github.com/user-attachments/assets/07ed84be-54ff-4d9a-9676-10a81210f542" />

- `/stats` route will gets the info about the coins which was sent in the body.

<img width="1008" alt="image" src="https://github.com/user-attachments/assets/965d4a16-03c8-482f-933f-38fd7c3d5d08" />

- `/deviation` route will gets the current price of the coin sent in the body and compare it with the data stored in the database

<img width="1008" alt="image" src="https://github.com/user-attachments/assets/5bb24ff8-7527-4c50-8fdc-80452fe53976" />

