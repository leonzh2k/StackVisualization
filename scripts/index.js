window.addEventListener('load', 
function() { 
    // window.stack = [];
    window.stackItemNumber = 0;
    window.stackDOMNode = document.getElementById('stack');
}, false);

function stackPush(stack) {
    //overflows after 24
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
    
    //push on stack
    // try {
    //     stack.push(newStackItem.id);
    // }
    // catch(err) {
    //     alert(err.message);
    // }

    //alert(stack);
    //alert(String(stackItemNumber));
    
}

function stackPop(stack) {
    //alert("stack pop");
    //pop representation element off, then remove associated html element from dom
    // var poppedStackItemId = stack.pop();
    if (stackItemNumber == 0) {
        return;
    }
    stackDOMNode.children[0].remove();
    stackItemNumber--;
    //alert(String(stackItemNumber));
}