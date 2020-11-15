window.addEventListener('load', (event) => {
    try {
        window.stack = [];
        window.stackItemNumber = 0;
        window.stackDOMNode = document.getElementById('stack');
        window.fileInputRunning = false;
        window.actionNumber = 0;
        document.getElementById('inputfile').addEventListener('change', function() { 
            var fr=new FileReader(); 
            fr.onload=function(){ 
                document.getElementById('output').textContent=fr.result; 
                document.getElementById('current-operation-name').textContent = "FILE LOADED"
            } 
            fr.readAsText(this.files[0]); 

        })
    }
    catch(err) {
        alert(err.message);
    }
    //alert("page loaded");
});


function stackPush() {
    //alert("stack push")
    //overflows after 24
    try {
        if (stackItemNumber == 24) {
            return;
        }
        //create new html element
        var newStackItem = document.createElement('div');
        stackItemNumber++;
        //add instance's attributes
        newStackItem.id = "item" + String(stackItemNumber);
        newStackItem.classList.add("stack-item");
        newStackItem.textContent = "Item " + String(stackItemNumber);
        if (stackItemNumber == 1) {
            stackDOMNode.appendChild(newStackItem);
        }
        else {
            stackDOMNode.insertBefore(newStackItem, stackDOMNode.children[0]);
        }
    }
    catch(err) {
        alert(err.message);
    }
    
    
    //push on stack
    try {
        stack.push(newStackItem.id);
    }
    catch(err) {
        alert(err.message);
    }
    //alert("stack push done")
    //alert(stack);
    //alert(String(stackItemNumber));
    
}

function stackPop() {
    //alert("stack pop")
    //alert("stack pop");
    //pop representation element off, then remove associated html element from dom
    var poppedStackItemId = stack.pop();
    if (stackItemNumber == 0) {
        return;
    }
    document.getElementById(poppedStackItemId).remove();
    // stackDOMNode.children[0].remove();
    stackItemNumber--;
    //alert(stack);
    //alert(String(stackItemNumber));
    //alert("stack pop done")
}
//https://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html
function runFile() {
    //means no file 
    if (!document.getElementById('inputfile').files[0]) {
        document.getElementById('current-operation-name').textContent = "ERROR: NO FILE DETECTED";
        return 1;
    }
    //
    if (fileInputRunning) {
        return 1;
    }
    fileInputRunning = true;
    //alert(document.getElementById('output').textContent);
    var cmdsToRun = document.getElementById('output').textContent;
    cmdsToRun = cmdsToRun.split(" ");
    //alert(cmdsToRun);
    var timer = 1000;
    try {

        //will execute after all ops done
        setTimeout(function(){ 
            document.getElementById('current-operation-name').textContent = "FINISHED";
            actionNumber = 0;
            fileInputRunning = false;
        }, timer * (cmdsToRun.length + 1));

        for (var i = 0; i < cmdsToRun.length; i++) {
            
            
            //alert(actionNumber);
            if (cmdsToRun[i] === "push") {
                //alert("push");
                actionNumber = i + 1;
                actionNumber = actionNumber.toString();
                //alert(actionNumber);
                var delay = function(actionNumber) {
                    setTimeout(function() {  
                        document.getElementById('current-operation-name').textContent = actionNumber + ": PUSH";
                        stackPush(); 
                    }, timer);
                }
                delay(actionNumber);
                
            }
            if (cmdsToRun[i] === "pop") {
                //alert("pop");
                actionNumber = i + 1;
                actionNumber = actionNumber.toString();
                var delay = function(actionNumber) {
                    setTimeout(function() {  
                        document.getElementById('current-operation-name').textContent = actionNumber + ": POP";
                        stackPop(); 
                    }, timer);
                }
                delay(actionNumber);
            }
            timer += 1000;
            
        }
    }
    catch(err) {
        document.getElementById('current-operation-name').textContent = "ERROR";
        alert(err.message);
    }
    
    return 0;
}

