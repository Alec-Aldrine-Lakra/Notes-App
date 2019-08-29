'use strict';
const yargs = require('yargs'); //for command line input
const util = require('./util.js');
const chalk = require('chalk');

//Adding a new Note
yargs.command({
	command:'add',
	describe : 'Adding Notes',
	builder:{
		title:{
			describe:'Title of the note',
			demandOption:true, //Makes the argueent compulsory with add command
			type:'string' //doesn't allow boolean value meaning it expects an arguement
		},
		author:{
			describe:'Author of the note',
			demandOption:true, //Makes the argueent compulsory with add command
			type:'string' //doesn't allow boolean value meaning it expects an arguement
		},
		body:{
			describe:'Body of the note',
			demandOption:true, //Makes the argueent compulsory with add command
			type:'string' //doesn't allow boolean value meaning it expects an arguement
		}
	},
	handler: function(argv){
		util.addNote(argv['title'],argv['author'],argv['body']);	
	}
})

//Displaying all the notes
yargs.command({
	command:'display',
	describe : 'Display Notes',
	handler: function(){
		if(util.getNotes().length==0)
			console.log(chalk.bgRed.underline('No notes found !'));
		else
			console.log(util.getNotes());
	}
})

//Deleting a Note based on title
yargs.command({
	command:'delete',
	describe : 'Delete a Note',
	builder:{
		title:{
			describe:'Title of the note',
			demandOption:true, //Makes the argueent compulsory with add command
			type:'string' //doesn't allow boolean value meaning it expects an arguement
		}
	},
	handler: function(argv){
		util.deleteNote(argv['title']);
	}
})
yargs.parse(); //Parsing above arguements