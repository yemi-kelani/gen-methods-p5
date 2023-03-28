# A4: Swarms!

## Your name
Yemi Kelani

## Your Glitch link
[my page](https://a1-yembo.glitch.me/)


## Which systems behaved like you expected? Which ones surprised you? In which ones did your initial idea evolve into something different?

The spring system behaved as expected for the most part. Same with the "Gravity" system I made.
I couldn't make anything to complex, so I focused on modifying the code I was given.
The spring system surprised me because I broke it. I forgot for a second that it
was a simulation and that simulating springs and spring constants can have weird effects. 
Reminds me of bugs in skyrim.

My gravity system evolved as I progressed through it.


## Describe your 1st system. What forces does it use? What is its emergent behavior?
Wind system. It is close to the example code but it employs flowers rather than leaves 
and uses a sin function to vary the widths and heights


## Describe your 2nd system. What forces does it use? What is its emergent behavior?
Spring System. It is close to the example code. Uses fake trailing. Also changed it so 
that each vertex conects to one another to stabilize the forces. 

You can drag the particles


## Describe your 3rd system. What forces does it use? What is its emergent behavior?
Boids system. It is a variation of the starter code. Calulates a flockcenter but also adds force towards
the mouse position.


## Describe your 4th system. What forces does it use? What is its emergent behavior?
Gravity. It uses gravity. Click or drag the mouse to create a particle. Each particle will create another
particle with an anti-gravity force.


## Which system has one particle uses "particle-to-all-particles" forces (Boids style) or reads a map (Braitenberg-style). Explain how.

The boids system. If calculates a flockCenter in relation to the mouse center particle and flock.


## Which system has particles that leave a trail or creates new particles

The system titled: "Gravity" (create new particles by clicking, and each of those particles will create a reverse particle)


## Which system interacts with user behavior, and how?

All systems. I implemented a slider. It changes the ratio of green to pink flowers. 
Select a ratio and then reload the system.


## List any resources (code, images, etc) you've used, and where you got them from

starter code
flower images are my own

## List any help you got from classmates or websites, so that you can remember it for later

n/a