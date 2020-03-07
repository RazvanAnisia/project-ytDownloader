Used to download youtube videos and convert them to mp3.

## Requirements

Create a .env file in the root of the project, add a FILES_PATH variable inside that points to the location you will put the list of youtube videos in, and where they will be saved.

Inside that folder, create a `list.txt` like this: <br>
https://www.youtube.com/watch?v=wnJ6LuUFpMo <br>
https://www.youtube.com/watch?v=kJQP7kiw5Fk0 <br>
https://www.youtube.com/watch?v=t4H_Zoh7G5A <br>
https://www.youtube.com/watch?v=6JnGBs88sL0 <br>
Every single link needs to be put on a new line(the app will be looking for `\n` the character)

## Usage

From the root of the project run `npm run download`.
