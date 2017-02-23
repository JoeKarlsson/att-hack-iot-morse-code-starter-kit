# AT&T Hackathon IoT Morse Code Emitter Starter Kit

In this demo, we will be getting our hands dirty the Raspberry Pi and Nodejs. We will be writing a simple program in Node.js to turn a LED on and off. Then we will extend this logic to build a simple piece of embedded system that can take a piece of string and emit its morse code.


## Materials

* 1 x Raspberry Pi (We used a Raspberry Pi 3 Model B for this demo)
* 1 x Breadboard
* 1 x 68 Ohms resistor
* 1 x LED
* 2 x Female to male wires

## Schematics

![screen-shot-2014-10-03-at-5 33 02-pm](https://cloud.githubusercontent.com/assets/4650739/23240667/c6d58c88-f912-11e6-9d88-5577050d35c3.png)

The left end of the above circuit will be connected to Pin 9 – GND pin of pi (Left Column, 5th pin). And the right end of the above circuit will be connected to Pin 11(Left Column, 6th pin).

## Prerequesites

* Node js should be installed on your Pi - [Check out this article for tips](https://www.losant.com/blog/how-to-install-nodejs-on-raspberry-pi)
* NPM should be installed on your Pi


## Setup Your Project

Download and unpack [the project](https://github.com/devleague/ATT-Hack-IoT-Morse-Code-Starter-Kit) on your Raspberry Pi in the directory of your choice. Or alternatively checkout from source:

    git git@github.com:devleague/ATT-Hack-IoT-Morse-Code-Starter-Kit.git
    cd ATT-Hack-RPi-Sound-Sensor-Websocket-Starter-Kit

Next, inside the project, you need to install the project's various NPM dependencies:

    npm install

And you should now be ready to spin up a development build of your new project:

    npm start

Navigate to [http://localhost:3000](http://localhost:3000) in your browser of choice.

Once your breadboard is configured, you should be able to enter a message onto the form and upon submission your Pi will emit your message in morse code :tada:.

## For use on a Rasperberry Pi
Since this is the IoT, let us expose our localhost as a publicly accessible URL. For that we will use ngrok.


To use Ngrok you need to download ngrok application to your Raspberry Pi.  To do that type the following command on your Raspberry Pi terminal:

    sudo wget https://dl.ngrok.com/ngrok_2.0.19_linux_arm.zip

and then unzip it using:

    sudo unzip ngrok_2.0.19_linux_arm.zip


This will take a few minutes, please be patient. Once the download is completed, we will unzip it. Run

    unzip ngrok.zip

You will have to sign up with ngrok to establish a secure connection with your Pi. To create a ngrok account click here and then click signup to get an authtoken key. This token is necessary if you want your own custom domain doing an online SSH.

You need to embed this token to your Raspberry Pi in the command line using:

    ./ngrok authtoken  yourauthtoken

Now, that is done, we will restart the node server. Run

    sudo node server.js

Open a new terminal/putty into the Pi and cd into the ngrok folder. And from there run

    ./ngrok http 3001

3001 is the port number we have used in server.js. This will give you a public URL. You can use either the http or https version. Open a browser on your computer and navigate to  http://41b9687d.ngrok.com/trigger where  http://41b9687d.ngrok.com needs to be replaced with your ngrok URL.

If everything is okay, as soon as you connect to the address, a new websocket will be created and you will be able to tranmist data between the client and the server.


##Contributing

1. Fork it!
2. Create your feature branch: ```git checkout -b my-new-feature```
3. Commit your changes: ```git commit -am 'Add some feature'```
4. Push to the branch: ````git push origin my-new-feature````
5. Submit a pull request :D

##Credits

- [DevLeague](http://www.devleague.com/)
- [Jr. DevLeague](http://jrdevleague.com/)