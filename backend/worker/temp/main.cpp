#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& arr) {
        reverse(arr.begin(), arr.end());
        return arr;
    }
};

int main() {
    vector<int> arr;
    int num;

    // Read input in the format [1, 2, 3, 4, 5]
    string input;
    getline(cin, input);
    input = input.substr(1, input.length() - 2); // Remove the brackets

    stringstream ss(input);
    while (ss >> num) {
        arr.push_back(num);
        if (ss.peek() == ',') ss.ignore();
    }

    Solution obj;
    vector<int> result = obj.reverseArray(arr);

    // Print the result in the format [5, 4, 3, 2, 1]
    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        cout << result[i];
        if (i != result.size() - 1) {
            cout << ", ";
        }
    }
    cout << "]" ;

    return 0;
}

