
async function even_rand() {
    rand = Math.floor(Math.random() * 10);
    if (rand % 2 == 0) {
        return (rand);
    } else {
        return (-1);
    }
}

// want to square the results
async function square_even_rand() {
    // will not block
    result = await even_rand();
    console.log("does this really wait?");
    if (result != -1)
        return result * result;
    else return -1;
}

square_even_rand().then(function (x) { console.log(x) });