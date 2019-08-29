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
	let uid;
	const prevData = getNotes();
	const duplicateCheck = prevData.find((item)=>{
		return item.title === t; //returns the first element that matches the title instead of using filter() that checks entire array
	})
	if(duplicateCheck === undefined){
		if(prevData.length === 0)
			uid=1;
		else
			uid = prevData[prevData.length-1]['id']+1;	
		const data = {
			id: uid,
			title : t,
			author: a,
			description: b
		};
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

function deleteNote(id){ //Deleting a note
	const prevData = getNotes();
	id= parseInt(id);
	const newData = prevData.filter((item)=>{
		return item.id !== id;
	})
	if(newData.length !== prevData.length){
		saveNote(newData);
		console.log(chalk.magenta.bold('Note Deleted !'));	
	}
	else
		console.log(chalk.bgRed.underline('No Notes found !'));
	
}

function readNote(id){ //Reading a note
	const prevData = getNotes();
	id= parseInt(id);
	let i=0,flag=0;
	while(i<prevData.length){
		if(prevData[i]['id'] === id){
			console.log(chalk.bold.cyan(prevData[i]['title']+' By '+prevData[i]['author']));
			console.log(chalk.bold.cyan(prevData[i]['description']));
			flag=1;
			break;
		}
		i++;
	}
	if(flag==0)
		console.log(chalk.bgRed.underline('No notes found !'));
}

module.exports = {getNotes, addNote, readNote, deleteNote};