import { createSlice } from "@reduxjs/toolkit";

type questionState = {
    questions: any[],
    tags: string[],
}

const initialState: questionState = {
    questions: [],
    tags: [
        'Array',
        'String',
        'Linked List',
        'Tree',
        'Graph',
        'Dynamic Programming',
        'Backtracking',
        'Greedy',
        'Bit Manipulation',
        'Math',
        'Hash Table',
        'Stack',
        'Queue',
        'Heap',
        'Sorting',
        'Searching',
        'Binary Search',
        'Two Pointers',
        'Recursion',
        'Design',
        'Topological Sort',
        'Trie',
        'Segment Tree',
        'Union Find',
        'Breadth First Search',
        'Depth First Search',
        'Binary Indexed Tree',
        'Divide and Conquer',
        'Sliding Window',
        'Suffix Array',
        'Suffix Tree',
        'Geometry',
        'Random',
        'Memoization',
        'Queue',
        'Priority Queue',
        'Deque',
        'Map',
        'Set',
        'Multiset',
    ],
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
    }
})

export const { setQuestions } = questionSlice.actions;
export default questionSlice.reducer;