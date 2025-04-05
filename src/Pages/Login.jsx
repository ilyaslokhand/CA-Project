import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordKeySvg from "@/utility/Svg/PasswordKeySvg";
import UserNameSvg from "@/utility/Svg/UserNameSvg";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <Card className="w-[90%] max-w-[916px] min-h-[90svh] max-h-[788px] p-4 flex flex-col justify-center">
        <h1 className="text-[64px] font-normal text-center text-[#7427C2] font-lustria">
          EasyDoc
        </h1>

        <h2 className="text-[36px] text-center mt-4 text-[#3D3D3D] font-extrabold">
          Login
        </h2>

        <CardContent className="mt-6 space-y-6 flex flex-col items-center px-0">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {" "}
              <UserNameSvg />
            </div>

            <Input
              placeholder="Username"
              className="pl-10 h-12 rounded-lg w-full"
            />
          </div>

          <div className="relative w-full max-w-[500px]">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <PasswordKeySvg />
            </div>
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 h-12 rounded-lg w-full"
            />
          </div>

          <Button className="h-12 w-[100%] max-w-[323px] bg-[#9973A8]">
            Login
          </Button>

          <p className="text-center text-sm text-gray-500 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
