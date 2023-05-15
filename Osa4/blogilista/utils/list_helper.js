const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const likesArray = array.map(({likes}) => (likes))
    const reducer = (sum, item) => {
        return sum + item
    }

    return likesArray.length === 0
        ? 0
        : likesArray.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
    const likesArray = array.map(({likes}) => (likes))
    const maxLikes = Math.max(...likesArray)
    const i = likesArray.indexOf(maxLikes)

    return array[i]
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}