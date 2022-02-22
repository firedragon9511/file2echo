exports.HelpBuilder = function(){
    var data = [];

    var banner = `
    _______ __ __         ______ _______        __          
    |    ___|__|  |.-----.|__    |    ___|.----.|  |--.-----.
    |    ___|  |  ||  -__||    __|    ___||  __||     |  _  |
    |___|   |__|__||_____||______|_______||____||__|__|_____|
                                                  
    Convert files to Linux printf lines.
    
    --------[[ By: firedragon9511 ]]--------
    `; // --------- By: firedragon9511 ------------

    this.GetBanner = () => {
        return banner  + "\n"  ;
    }

    this.AddUsage = (usage) => {
        data.push("Usage:");
        data.push("\t" + usage);
        data.push("");

    }


    this.AddField = (str) => {
        data.push(str);
    }

    this.AddParam = (param, description) => {
        data.push(param + "\t\t" + description)
    }

    this.ToString = () => {
        return banner + "\n\n\n" + data.join("\n") + "\n";
    }

}