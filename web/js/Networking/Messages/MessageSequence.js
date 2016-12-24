function MessageSequence()
{
}

MessageSequence.current = 0;

/**
* @returns {number}
*/
MessageSequence.nextValue = function ()
{
    MessageSequence.current++;
    return this.current;
}