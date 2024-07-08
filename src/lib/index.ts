import path from "path";
import fs from "fs";
import { HttpException } from "../exceptions/http.exception";
import { HttpStatusCode } from "../constants/http.enum";

class lib {
  static deleteFile(filename: string) {
    try {
      const filePath = path.join(__dirname, "../storage", filename as string);
      // Check if file exists
      if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlinkSync(filePath);
        return true;
      } else {
        throw new HttpException(
          HttpStatusCode.NotFound,
          "Delete failed. File not found"
        );
      }
    } catch (error) {
      throw new HttpException(
        HttpStatusCode.InternalServerError,
        'Internal Server Error'
      );
    }
  }
}

export default lib;
