Kit Langton 7:06 PM
You're gonna wanna look into the Procfile
where you define how your application is started.
  
Ian Halverson 7:07 PM
put build in the server folder, delete the other git folders, git-init in the server folder, and heroku create...
  
Benjamin Soung  7:07 PM
^ good idea
  
Ian Halverson 7:08 PM
you dont need the client folder at all. just make server folder your new home directory with build in it :)
  
Stephanie Barker  7:12 PM
this is silly :P
  
Ian Halverson 7:12 PM
doing it my way avoids CORs issues :)
  
Benjamin Soung  7:12 PM
yeah we should try ian's way - he is the founder of our app
  
Ian Halverson 7:13 PM
-_--
Stephanie Barker  7:13 PM
You should call it "Ian Halverson's Dinnerbell"
  
Kit Langton 7:13 PM
separate repos for frontend and backend is the more common solution for sure
  
Ian Halverson 7:14 PM
thats what i do ^^^
  
Stephanie Barker  7:14 PM
(TM)
  
Ian Halverson 7:14 PM
but then i run build, and copy statics into the server repo, so i can serve it