import mongoose from "mongoose";

const connected = async () => {
    try {
        mongoose.connect(process.env.MONGODB_USL!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to the database");
        });

        connection.on("error", (error) => {
            console.log("Error connecting to the database: ", error);
            process.exit();
        });
    } catch (error) {
        console.log("Error connecting to the database: ", error);
    }
};

export default connected;
