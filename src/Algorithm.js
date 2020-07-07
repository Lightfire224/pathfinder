import React from 'react'


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class Algorithm extends React.Component {

    state = {
        isSorting: false
    }

    bubbleSort = async (arr) => {
        let noSwaps
        for (let i = 0; i < arr.length; i++) {
            noSwaps = true
            for (let j = 0; j < arr.length; j++) {
                let shouldSwap = arr[j + 1] ? (arr[j].value > arr[j + 1].value) : false
                if (shouldSwap) {
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    noSwaps = false
                }
                this.props.sortButton(arr, j, j + 1, shouldSwap)
                await sleep(250)
            }
            if (noSwaps) break;
        }
        return arr
    }



    selectionSort = async (arr) => {
        for (var i = 0; i < arr.length; i++) {
            var lowest = i
            for (var j = i + 1; j < arr.length; j++) {
                var shouldSwap = arr[j].value < arr[lowest].value
                if (shouldSwap) {
                    lowest = j
                }
                await sleep(250)
                this.props.sortButton(arr, j, lowest, shouldSwap)
            }
            var temp = arr[i]
            arr[i] = arr[lowest]
            arr[lowest] = temp
        }
        await sleep(250)
        this.props.sortButton(arr, j, lowest, shouldSwap)
        return arr;
    }

    insertionSort = async (arr) => {
        for (var i = 1; i < arr.length; i++) {
            var currentVal = arr[i].value;
            for (var j = i - 1; j >= 0 && arr[j].value > currentVal; j--) {
                arr[j + 1].value = arr[j].value
                await sleep(250)
                this.props.sortButton(arr, j, i, true)
            }
            arr[j + 1].value = currentVal
        }
        await sleep(250)
        this.props.sortButton(arr, j, i, true)
        return arr
    }

    merge = async (arr, arr1, arr2) => {
        let results = []
        let i = 0
        let j = 0
        while (i < arr1.length && j < arr2.length) {
            if (arr2[j].value > arr1[i].value) {
                results.push(arr1[i]);
                i++
            } else {
                results.push(arr2[j])
                j++
            }
        }
        while (i < arr1.length) {
            results.push(arr1[i])
            i++;
        }
        while (j < arr2.length) {
            results.push(arr2[j])
            j++;
        }
        await sleep(250)
        return results
    }

    mergeSort = async (arr) => {
        if (arr.length <= 1) return arr
        let mid = Math.floor(arr.length / 2)
        let left = await this.mergeSort(arr.slice(0, mid))
        let right = await this.mergeSort(arr.slice(mid))
        this.props.updateMergeOne(left)
        this.props.updateMergeTwo(right)
        const res = await this.merge(arr, left, right)
        this.props.updateMergeSort(res)
        return res
    }

    handleBubbleClick = async () => {
        this.setState({ isSorting: true })
        this.props.disableOptions()
        await this.bubbleSort(this.props.newArray)
        this.setState({ isSorting: false })
        this.props.disableOptions()
    }

    handleSelectionClick = async () => {
        this.setState({ isSorting: true })
        this.props.disableOptions()
        await this.selectionSort(this.props.newArray)
        this.setState({ isSorting: false })
        this.props.disableOptions()
    }

    handleInsertionClick = async () => {
        this.setState({ isSorting: true })
        this.props.disableOptions()
        await this.insertionSort(this.props.newArray)
        this.setState({ isSorting: false })
        this.props.disableOptions()
    }

    handleMergeClick = async () => {
        this.setState({ isSorting: true })
        this.props.disableOptions()
        await this.mergeSort(this.props.newArray)
        this.setState({ isSorting: false })
        this.props.disableOptions()
    }

    handleQuickSort = async () => {
        this.setState({ isSorting: true })
        this.props.disableOptions()
        await this.quickSort(this.props.newArray)
        this.setState({ isSorting: false })
        this.props.disableOptions()
    }

    quickSort = async (array) => {
        this.quickSortHelper(array, 0, array.length - 1);
        return array;
    }

    quickSortHelper = async (array, startIdx, endIdx) => {
        if (startIdx >= endIdx) return;
        const pivotIdx = startIdx;
        let leftIdx = startIdx + 1;
        let rightIdx = endIdx;
        while (rightIdx >= leftIdx) {
            if (array[leftIdx].value > array[pivotIdx].value && array[rightIdx].value < array[pivotIdx].value) {
                this.swap(leftIdx, rightIdx, array);
            }
            if (array[leftIdx].value <= array[pivotIdx].value) leftIdx++;
            if (array[rightIdx].value >= array[pivotIdx].value) rightIdx--;
        }
        this.swap(pivotIdx, rightIdx, array);
        const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
        if (leftSubarrayIsSmaller) {
            this.quickSortHelper(array, startIdx, rightIdx - 1);
            this.quickSortHelper(array, rightIdx + 1, endIdx);
        } else {
            this.quickSortHelper(array, rightIdx + 1, endIdx);
            this.quickSortHelper(array, startIdx, rightIdx - 1);
        }
    }

    swap = async(i, j, array) => {
        let temp = array[j].value;
        array[j].value = array[i].value;
        array[i].value = temp;
    }




    render() {
        return (
            <div>
                <button disabled={this.state.isSorting} onClick={() => this.handleBubbleClick()}>Bubble Sort</button>
                <button disabled={this.state.isSorting} onClick={() => this.handleSelectionClick()}>Selection Sort</button>
                <button disabled={this.state.isSorting} onClick={() => this.handleInsertionClick()}>Insertion Sort</button>
                <button disabled={this.state.isSorting} onClick={() => this.handleMergeClick()}>Merge Sort</button>
                <button disabled={this.state.isSorting} onClick={() => this.handleQuickSort()}>Quick Sort</button>
            </div>
        )
    }
}