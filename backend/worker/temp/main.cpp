#include<bits/stdc++.h>


using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& arr) {
        return arr;
    }
};int main() {
    string input;
    getline(cin, input);
    input = input.substr(1, input.length() - 2); // Remove the brackets

    stringstream ss(input);
    vector<int> arr;
    int num;
    while (ss >> num) {
        arr.push_back(num);
        if (ss.peek() == ',') ss.ignore();
    }

    Solution obj;
    vector<int> result = obj.reverseArray(arr);

    cout << "[";
    for (int i = 0; i < result.size(); ++i) {
        cout << result[i];
        if (i != result.size() - 1) cout << ", ";
    }
    cout << "]";
    return 0;
}
