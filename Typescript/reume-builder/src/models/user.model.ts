import { IUSER } from "@/types/user.types";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt"

interface UserDocument extends Omit<IUSER, '_id'>, Document {
    comparePass(candidatePassword: string): boolean
}

const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        trim: true,
        require: [true,"Name is required"]
    },
    email: {
        type: String,
        trim: true,
        require: [true,"Email is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true,"Password is required"],
        minlength: [6, "Min 6 character required"]
    },
    mobile: {
        type: String,
        minlength: [10, "Min 10 characters required"],
        maxlength: [10, "Max 10 characters required"]
    }
}, { timestamps: true })

userSchema.pre("save", function (): void {
    if(!this.isModified('password')) return; 
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePass = function(candidatePassword: string): boolean {
    return bcrypt.compareSync(candidatePassword, this.password);
}

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;