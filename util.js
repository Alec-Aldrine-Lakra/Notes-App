const fs = require('fs');
const chalk = require('chalk');

function getNotes(){ //Display all notes
	try{
		let data= fs.readFileSync('notes.json','utf-8');
		dataJSON = JSON.parse(data);
		return dataJSON;	
	}
	catch(err){
		return [];
	}
}

function addNote(t,a,b){ //Adding a new note
	const prevData = getNotes();
	const data = {
		title : t,
		author: a,
		description: b
	};
	const duplicateCheck = prevData.find((item)=>{
		return item.title === t; //returns the first element that matches the title instead of using filter() that checks entire array
	})
	if(duplicateCheck.length ==0){
		prevData.push(data);
		saveNote(prevData);
		console.log(chalk.bold.green('Note Saved!'));
	}
	else
		console.log(chalk.bgRed.underline('Title already taken'));
}

function saveNote(data){ //Saving all the changed data
	dataJSON = JSON.stringify(data);
	fs.writeFile('notes.json',dataJSON,(err)=>{
		if(err)
			console.log('Error ',err);
	})
}

function deleteNote(title){ //Deleting a note
	const prevData = getNotes();
	const newData = prevData.filter((item)=>{
		return item.title !== title;
	})
	if(newData.length !== prevData.length){
		saveNote(newData);
		console.log(chalk.magenta.bold('Note Deleted !'));	
	}
	else
		console.log(chalk.bgRed.underline('No Notes found !'));
	
}

function readNote(title){ //Reading a note
	const prevData = getNotes();
	let i=0,flag=0;
	while(i<prevData.length){
		if(prevData[i]['title'] === title){
			console.log(chalk.bold.cyan(prevData[i].description));
			flag=1;
			break;
		}
		i++;
	}
	if(flag==0)
		console.log(chalk.bgRed.underline('No notes found !'));
}

module.exports = {getNotes, addNote, readNote, deleteNote};