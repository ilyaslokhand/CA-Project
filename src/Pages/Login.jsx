import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <Card className="w-full max-w-md p-6  ">
        <h1 className="text-[64px] font-normal text-center text-[#7427C2] font-lustria">
          EasyDoc
        </h1>

        <h2 className="text-[36px] text-center mt-4 text-[#3D3D3D] font-extrabold ">
          Login
        </h2>
        <CardContent className="mt-6 space-y-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faMobile}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <Input placeholder="Username" className="pl-10" />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faKey}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <Input type="password" placeholder="Password" className="pl-10" />
          </div>
          <Button className="w-full bg-[#9973A8]">Login</Button>
          <p className="text-center text-sm text-gray-500 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
