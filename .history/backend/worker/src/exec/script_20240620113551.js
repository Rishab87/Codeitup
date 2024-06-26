class Solution {
    reverseArray(arr) {
        arr.reverse();
        return arr;
    }
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', input => {
    // Clean the input and remove the brackets
    const input_data = input.trim().slice(1, -1); // Remove the brackets
    console.log(input_data);
    const data = input_data.split(', ').map(Number);
    const obj = new Solution();
    const result = obj.reverseArray([1 ,2 ,4 , 5]);

    // Prepare and sanitize the output
    const output = "[" + result.join(", ") + "]";

    // Filter out non-printable characters from the output
console.log(output);
});