'using strict'

const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject} = require('powercord/injector');

function desufy(s){
        s = s.replace(/(.)([.?!~]?)(?:\n|$)/g,function(match,p1,p2,offset,string)
        {
                return `${p1}${p1==='.'||p1===','?'':','} desu${p2||'.'}\n`
        })
        return s
}

deus = false;

module.exports = class desuifier extends Plugin {
	async startPlugin () {
	  powercord.api.commands.registerCommand({
		command: 'desuauto',
		description: 'make your desu auto. desu',
		usage: '{c}',
		executor: (args) => {
			deus=!deus
			return {
		        send: false,
			result: `Your text will now${deus?'':' not'} be desuified. desu.`
		}}
	});
	powercord.api.commands.registerCommand({
		command: 'desu',
		description: 'desuify a text. desu',
		usage: '{c} [text to desu]',
		executor: (args)=>{
			let ret = args.join(' ')
			if(!deus)
			{
				ret = desufy(ret)
			}
			return {
			send:true,
		        result:ret
		}}
	});
	
	const messageEvents = await getModule(["sendMessage"]);
    		inject("desufySend", messageEvents, "sendMessage", function(args) {
	    	if(deus) {
        	let text = args[1].content;
        	text = desufy(text);
        	args[1].content = text;      
	}      
	return args;  
    }, true);

  }
 
  pluginWillUnload () {
	powercord.api.commands.unregisterCommand('desuauto');
	powercord.api.commands.unregisterCommand('desu');
  }
};

