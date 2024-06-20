class Solution {
    reverseArray(arr) {
        arr.reverse();
        return arr;
    }
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', input => {
     const input_data = input.trim().slice(1, -1); // Remove the brackets   
     const data = input_data.split(', ').map(Number);   
     const obj = new Solution(); 
     const result = obj.reverseArray(data);\n\n    // Prepare and sanitize the output\n    const output = "[" + result.join(", ") + "]";\n\n    // Filter out non-printable characters from the output\nconsole.log(output);\n});
