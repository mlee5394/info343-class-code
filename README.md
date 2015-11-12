<<<<<<< HEAD
# info343-class-code
Starter repos for in-class coding done during INFO 343-E, Autumn 2015


@import can be a better practice for code maintainability

margins - push elements away from each other
padding - creates space b/w elements within the content and the box

em - height of current font

relative intrapage hyperlinks with hashes

rgba will help transparency rgba(0,0,0,transparency amount 0-1)


10/8
how to use boostrap
how to use media library
how to use display property to take elements that normally stack on top of each other inline
how to do floats/clears
and responsive css


fade image
linear gradient on background image (rgba(), rgba()), 

allow small screens to be adjusted by media rules
adjust css so on a small screen the background image isn't used and instead is used a background

adobe color


import vs link tag
you can use @import in css file with same boostrap url

brackets.io

boostrap for tables
row can sit side by side but can collapse on smaller 

md stands for medium sized screens
sm stands for small sized screes
xs stands for really small

ctrl-d is match anything that is selected


font awesome

node.js nodejs.org

node
    enters the node thing

javascript
    String in single or double quotes no distinction 

moment.js








=======
# INFO 343-E In-Class Code

Students should fork this repo into their own accounts so that they can code along with me and commit/push their code to their own GitHub accounts.

# Pulling Updates

Periodically I will ask you to pull new commits from this original repo to pick up new directories and file stubs. To do this, follow the appropriate set of instructions below.

## On A Lab Machine?

The lab machines reset each time you log out, so you need to setup your environment from scratch every time:

```bash
$ git config --global user.name "your name"
$ git config --global user.email "your email"
$ git config --global core.editor nano

$ git clone <your-forked-repo-url>
$ cd info343-class-code

$ git remote add upstream https://github.com/drstearns/info343-class-code.git

$ git pull upstream master
```

The last command will typically trigger a merge commit and put you into the nano editor to confirm the commit message. Hit `ctrl+x` to exit the editor and return to the command prompt.

## On Your Own Laptop?

 If you are on your own laptop, you should do these commands only once:

```bash
$ git config --global user.name "your name"
$ git config --global user.email "your email"
$ git config --global core.editor nano

$ git clone <your-forked-repo-url>
$ cd info343-class-code

$ git remote add upstream https://github.com/drstearns/info343-class-code.git
```

Then each time you need to pull from the my original repo, run these commands:

```bash
# change into your local repo directory
$ cd info343-class-code

# check for any uncommitted changes
# and commit if necessary
$ git status

# pull new commits from the upstream repo
$ git pull upstream master
```
>>>>>>> da0ad91fa2c7e33127469721003cfe515957ffc5
