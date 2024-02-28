import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

export async function encryptString(dataToHash: string): Promise<string>  {
  const iv = Buffer.from([0x21, 0x54, 0xe1, 0xc5, 0x6b, 0xc5, 0x11, 0xef, 0x4e, 0x83, 0x85, 0x1a, 0x57, 0x2e, 0xd6, 0xc0]);
  const key = (await promisify(scrypt)(process.env.CRYPTOPASSWORD, process.env.ENC_SALT, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    
    const encryptedText = Buffer.concat([
      cipher.update(dataToHash),
      cipher.final(),
    ]);
    const base64Result: string = encryptedText.toString('base64');
    return base64Result

  }
  


  export async function decrypt(TextToDecrypt: string): Promise<string> { 

    const encryptedText = Buffer.from(TextToDecrypt, 'base64');

    const iv = Buffer.from([0x21, 0x54, 0xe1, 0xc5, 0x6b, 0xc5, 0x11, 0xef, 0x4e, 0x83, 0x85, 0x1a, 0x57, 0x2e, 0xd6, 0xc0]);
    const key = (await promisify(scrypt)(
      process.env.REFERRAL_PASSWORD,
      process.env.ENC_SALT,
      32,
    )) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);


    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText.toString()
}