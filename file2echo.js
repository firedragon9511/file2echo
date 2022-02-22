const FileStream = require('fs');
const HelpBuilder = require("./helpBuilder.js").HelpBuilder;
const ArgumentParser = require("./argumentParser.js").ArgumentParser;

var File2Echo = function(){

    /**
     * 
     * @param {String} tmp 
     * @returns {String}
     */
    this.Hex = (tmp) => {
        var str = '';
        for(var i = 0; i < tmp.length; i++) {
            str += "\x5Cx" + tmp[i].charCodeAt(0).toString(16).padStart(2, '0');
        }
        return str;
    }

    /**
     * 
     * @param {String} file 
     * @returns {String}
     */
    this.ReadFile = (file, enc = "utf8") => {
        //console.log(enc);
        const data = FileStream.readFileSync(file,
            {encoding:enc, flag:'r'});
        return data;
    }

    this.ToEchoLinux = (file, mode, fileName, encoding = "utf8") => {
        var data = this.ReadFile(file, encoding);
        var hex = this.Hex(data);
        var result = [];
        var lineBreak = '\n';

        if(mode == "onequote"){
            return "printf \"%b\" \'" + this.Hex(data) +"\' >> " + fileName + '\r\n';
        }

        data = data.split('\n')

        for( var i in data ){
            // printf \"%b\" \'\x66\x6f\x6f\' > file.bin
            var and = "&&";
            switch(mode){
                case "oneline":
                    if( i == data.length -1) and = '';
                    result.push("printf \"%b\" \'" + this.Hex(data[i]) + "\' >> " + fileName+ " " + and + ' ');
                    lineBreak = '';
                    break;
                default:
                    result.push("printf \"%b\" \'" + this.Hex(data[i]) + "\' >> " + fileName);
                    break;
            }

        }

        return result.join(lineBreak);
    }
}



var file2echo = new File2Echo();


var help = new HelpBuilder();
help.AddUsage("node file2echo.js -f [FILE] [OPTIONS]");
help.AddField("Options:\n");
help.AddParam("\t-h", "Help");
help.AddParam("\t-f", "Specify the file");
help.AddParam("\t-n", "Output file name. Default: \"file.bin\"");
help.AddParam("\t-m", "Mode. Ex.: oneline, onequote, default");
//help.AddParam("\t-e", "Encoding. Ex.: utf8, utf16le, latin1");





if(process.argv.length <= 2){
    console.log(help.ToString());
    return;
}


var argumentParser = new ArgumentParser(process.argv);
if(argumentParser.HasParam("-h")){
    console.log(help.ToString());
    return;
}

console.log(help.GetBanner());



url = argumentParser.GetParamValue("-f", "#error");
mode = argumentParser.GetParamValue("-m", "default");
fileName = argumentParser.GetParamValue("-n", "file.bin");
//encoding = argumentParser.GetParamValue("-e", "utf8");
encoding = "utf8";



console.log(file2echo.ToEchoLinux(url, mode, fileName, encoding))
