const bcrypt = require("bcryptjs");

async function main() {
    const plainPassword = "1";
    const saltRounds = 1;

    const passwordHash1 = await bcrypt.hash(plainPassword, saltRounds);
    const passwordHash2 = await bcrypt.hash(plainPassword, saltRounds);
    const passwordHash3 = await bcrypt.hash(plainPassword, 5);

    const compare1 = await bcrypt.compare(plainPassword, passwordHash1);
    const compare2 = await bcrypt.compare(plainPassword, passwordHash2);
    const compare3 = await bcrypt.compare(plainPassword, passwordHash3);

    console.log("Hash #1:", passwordHash1);
    console.log("Hash #2:", passwordHash2);
    console.log("Hash equal?", passwordHash1 === passwordHash2);
    console.log("Hash #3:", passwordHash3);

    console.log("Compare plain with Hash #1:", compare1);
    console.log("Compare plain with Hash #2:", compare2);
    console.log("Compare plain with Hash #3:", compare3);
}

main().catch(console.error);