const fs = require('fs');
const chalk = require('chalk');

function getNotes(){
	try{
		let data= fs.readFileSync('notes.json','utf-8');
		dataJSON = JSON.parse(data);
		return dataJSON;	
	}
	catch(err){
		return [];
	}
}

function addNote(t,a,b){
	const prevData = getNotes();
	const data = {
		title : t,
		author: a,
		description: b
	};
	const duplicateCheck = prevData.filter((item)=>{
		return item.title === t;
	})
	if(duplicateCheck.length ==0){
		prevData.push(data);
		saveNote(prevData);
		console.log(chalk.bold.green('Note Saved!'));
	}
	else
		console.log(chalk.bgRed.underline('Title already taken'));
}

function saveNote(data){
	dataJSON = JSON.stringify(data);
	fs.writeFile('notes.json',dataJSON,(err)=>{
		if(err)
			console.log('Error ',err);
	})
}

function deleteNote(title){
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
module.exports = {getNotes, addNote, deleteNote};