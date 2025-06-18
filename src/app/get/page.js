"use client"

import { CodeBlock } from "@/components/ui/code-block"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function Home() {
    return (
        <div className="m-15 flex flex-col gap-5">
            {/* Windows */}
            <Card>
                <CardHeader>
                    <CardTitle>Windows</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Badge variant="secondary">Manual (p7b)</Badge>
                    <lo className="list-decimal">
                        <li>Execute tensamin.p7b</li>
                        <li>Expand the folder and select Certificates</li>
                        <li>For both the certificates double click them and choose 'Install Certificate'</li>
                        <li>Select 'Local Machine' as the certificate store location (unless you don't have administrative rights)</li>
                        <li>For 'Place all certificates in the following store' click 'Browse' and select 'Trusted Root Certification Authorities'</li>
                    </lo>
                    <Badge variant="secondary">Manual (p12)</Badge>
                    <lo className="list-decimal">
                        <li>Execute tensamin.p12</li>
                        <li>Select 'Local Machine' as the certificate store location (unless you don't have administrative rights)</li>
                        <li>Leave password field empty</li>
                        <li>For 'Place all certificates in the following store' click 'Browse' and select 'Trusted Root Certification Authorities'</li>
                    </lo>
                    <Badge variant="secondary">Automated</Badge>
                    <CodeBlock style="materialDark" language="cmd" code="certutil.exe -addstore root tensamin.cer" />
                </CardContent>
                <CardFooter className="gap-5">
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/p7b", "tensamin.p7b")
                        }}
                    >Get tensamin.p7b</Button>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/p12", "tensamin.p12")
                        }}
                    >Get tensamin.p12</Button>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/cer", "tensamin.cer")
                        }}
                    >Get tensamin.cer</Button>
                </CardFooter>
            </Card>

            {/* Linux */}
            <Card>
                <CardHeader>
                    <CardTitle>Linux</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Badge variant="secondary">Ubuntu & Debian based</Badge>
                    <CodeBlock style="materialDark" language="cmd" code={`mv tensamin.pem /usr/local/share/ca-certificates/tensamin.crt
sudo update-ca-certificates`} />
                    <Badge variant="secondary">Fedora & Red Hat based</Badge>
                    <CodeBlock style="materialDark" language="cmd" code={`mv tensamin.pem /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust`} />
                    <Badge variant="secondary">Arch Linux & CachyOS based</Badge>
                    <CodeBlock style="materialDark" language="cmd" code="sudo trust anchor --store tensamin.pem" />
                </CardContent>
                <CardFooter>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/pem", "tensamin.pem")
                        }}
                    >Get tensamin.pem</Button>
                </CardFooter>
            </Card>

            {/* MacOS */}
            <Card>
                <CardHeader>
                    <CardTitle>MacOS</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Badge variant="secondary">Manual</Badge>
                    <lo className="list-decimal">
                        <li>Execute tensamin.pem</li>
                        <li>Find 'Tensamin' and double click it</li>
                        <li>Make the 'Secure Socket Layer' always trust the certificate</li>
                    </lo>
                    <Badge variant="secondary">Automated</Badge>
                    <CodeBlock style="materialDark" language="cmd" code="sudo security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain tensamin.pem" />
                </CardContent>
                <CardFooter>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/pem", "tensamin.pem")
                        }}
                    >Get tensamin.pem</Button>
                </CardFooter>
            </Card>

            {/* iOS / iPadOS */}
            <Card>
                <CardHeader>
                    <CardTitle>iOS / iPadOS (Version 13+)</CardTitle>
                </CardHeader>
                <CardContent>
                    <lo className="list-decimal">
                        <li>Using Safari download the certificate</li>
                        <li>Open the settings app</li>
                        <li>Open 'General / VPN & Device Management' and install Tensamin</li>
                        <li>Then open 'General / About / Certificate Trust Settings' and enable Tensamin</li>
                    </lo>
                </CardContent>
                <CardFooter>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/pem", "tensamin.pem")
                        }}
                    >Get tensamin.pem</Button>
                </CardFooter>
            </Card>

            {/* Android */}
            <Card>
                <CardHeader>
                    <CardTitle>Android (Version 10+)</CardTitle>
                </CardHeader>
                <CardContent>
                    <lo className="list-decimal">
                        <li>Open tensamin.cer</li>
                        <li>Use 'Tensamin' as the certificate name</li>
                        <li>Select 'VPN and Apps' for the certificate use</li>
                        <li>Click 'OK'</li>
                    </lo>
                </CardContent>
                <CardFooter>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/cer", "tensamin.cer")
                        }}
                    >Get tensamin.cer</Button>
                </CardFooter>
            </Card>

            {/* Other */}
            <Card>
                <CardHeader>
                    <CardTitle>Other</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Lookup the installation guide for your OS</p>
                </CardContent>
                <CardFooter className="gap-5">
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/pem", "tensamin.pem")
                        }}
                    >Get tensamin.pem</Button>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/p12", "tensamin.p12")
                        }}
                    >Get tensamin.p12</Button>
                    <Button
                        className=""
                        onClick={() => {
                            downloadFile("/cert/cer", "tensamin.cer")
                        }}
                    >Get tensamin.cer</Button>
                </CardFooter>
            </Card>
        </div>
    )
}