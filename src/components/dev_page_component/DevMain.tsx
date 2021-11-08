import Link from "next/link";
import { useState } from "react";
import { CustomImage } from "..";

export function DevMain(): JSX.Element {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-screen h-screen absolte top-0 left-0 overflow-y-auto font-bold font-ibm-korean text-lg text-center text-white whitespace-pre-line">
            <Link href="/" passHref>
                <div className="w-40 h-16 absolute bg-white text-black text-2xl flex justify-center items-center top-10 left-10 rounded-md">
                    {"< Main"}
                </div>
            </Link>
            <div className="w-full h-auto p-8 bg-black">
                <div className="w-full h-full border-solid border-4 border-amber-300 border-opacity-60 flex flex-col justify-center items-center gap-y-5 p-8 pt-32">
                    <div className="w-40 h-40">
                        <CustomImage src="/icon.png" />
                    </div>
                    <p className="text-4xl">{"ARKNIGHTS ONE"}</p>
                    <p className="text-2xl">{"v1.0.0"}</p>
                    <p>
                        {
                            "Copyright © 2021. arknights.one.\nAll related sites' functional codes are properties of arknights.one."
                        }
                    </p>
                    <p>
                        {
                            "Illegal usage on API, Proxy server, WebServer and attacking on website could ban your ip in indefinitely."
                        }
                    </p>
                    <div className="w-3/5 h-40">
                        <CustomImage src="/copyright.png" />
                    </div>
                    <p>{"©2017 HYPERGRYPH CO., LTD ©2019 YOSTAR LIMITED"}</p>
                    <p>
                        {
                            "All media assets used in this site are properties of Hypergryph Co., LTD & Yostart Limited"
                        }
                    </p>
                    <p className="text-4xl mt-20">{"DEVELOPERS"}</p>
                    <div className="w-full h-auto flex flex-row justify-evenly items-center p-4">
                        <div className="w-auto h-auto flex flex-col justify-center items-center text-2xl gap-y-4">
                            <p>{"Front-End"}</p>
                            <div className="w-40 h-40 rounded-full overflow-hidden">
                                <CustomImage src="/yusa.webp" />
                            </div>
                            <p>{"Yusa"}</p>
                        </div>
                        <div className="w-auto h-auto flex flex-col justify-center items-center text-2xl gap-y-4">
                            <p>{"Back-End"}</p>
                            <div className="w-40 h-40 rounded-full overflow-hidden">
                                <CustomImage src="/atez.webp" />
                            </div>
                            <p>{"Atez"}</p>
                        </div>
                    </div>
                    <p className="text-4xl mt-20">{"Contact"}</p>
                    <div className="w-auto h-auto flex flex-row  mt-10 justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 mr-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <p className="text-3xl">
                            <a href="mailto:admin@arknights.one">
                                {"admin@arknights.one"}
                            </a>
                        </p>
                    </div>
                    <p className="text-4xl mt-20">{"Terms of Service"}</p>
                    <div
                        className="w-1/5 h-20 bg-white text-black text-2xl uppercase flex justify-center items-center rounded-lg"
                        onClick={() => {
                            setOpen((prev) => !prev);
                        }}
                    >
                        {open ? "close" : "open"}
                    </div>
                    {open ? (
                        <div className="w-4/5 h-auto p-4 border-white border text-left">
                            <h1 className="text-2xl mt-8">
                                Terms and Conditions
                            </h1>
                            <p>Last updated: November 08, 2021</p>
                            <p>
                                Please read these terms and conditions carefully
                                before using Our Service.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Interpretation and Definitions
                            </h1>
                            <h2 className="text-xl mt-2">Interpretation</h2>
                            <p>
                                The words of which the initial letter is
                                capitalized have meanings defined under the
                                following conditions. The following definitions
                                shall have the same meaning regardless of
                                whether they appear in singular or in plural.
                            </p>
                            <h2 className="text-xl mt-2">Definitions</h2>
                            <p>
                                For the purposes of these Terms and Conditions:
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        <strong>Affiliate</strong> means an
                                        entity that controls, is controlled by
                                        or is under common control with a party,
                                        where &quot;control&quot; means
                                        ownership of 50% or more of the shares,
                                        equity interest or other securities
                                        entitled to vote for election of
                                        directors or other managing authority.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Country</strong> refers to:
                                        South Korea
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Company</strong> (referred to as
                                        either &quot;the Company&quot;,
                                        &quot;We&quot;, &quot;Us&quot; or
                                        &quot;Our&quot; in this Agreement)
                                        refers to Arknights One.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Device</strong> means any device
                                        that can access the Service such as a
                                        computer, a cellphone or a digital
                                        tablet.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Service</strong> refers to the
                                        Website.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Terms and Conditions</strong>{" "}
                                        (also referred as &quot; Terms&quot;)
                                        mean these Terms and Conditions that
                                        form the entire agreement between You
                                        and the Company regarding the use of the
                                        Service.This Terms and Conditions
                                        agreement has been created with the help
                                        of the{" "}
                                        <a
                                            href="https://www.termsfeed.com/terms-conditions-generator/"
                                            target="_blank"
                                        >
                                            Terms and Conditions Generator
                                        </a>
                                        .
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Third-party Social Media Service
                                        </strong>{" "}
                                        means any services or content (including
                                        data, information, products or services)
                                        provided by a third-party that may be
                                        displayed, included or made available by
                                        the Service.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Website</strong> refers to
                                        Arknights One, accessible from{" "}
                                        <a
                                            href="https://arknights.one"
                                            rel="external nofollow noopener"
                                            target="_blank"
                                        >
                                            https://arknights.one
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>You</strong> means the
                                        individual accessing or using the
                                        Service, or the company, or other legal
                                        entity on behalf of which such
                                        individual is accessing or using the
                                        Service, as applicable.
                                    </p>
                                </li>
                            </ul>
                            <h1 className="text-2xl mt-8">Acknowledgment</h1>
                            <p>
                                These are the Terms and Conditions governing the
                                use of this Service and the agreement that
                                operates between You and the Company. These
                                Terms and Conditions set out the rights and
                                obligations of all users regarding the use of
                                the Service.
                            </p>
                            <p>
                                Your access to and use of the Service is
                                conditioned on Your acceptance of and compliance
                                with these Terms and Conditions. These Terms and
                                Conditions apply to all visitors, users and
                                others who access or use the Service.
                            </p>
                            <p>
                                By accessing or using the Service You agree to
                                be bound by these Terms and Conditions. If You
                                disagree with any part of these Terms and
                                Conditions then You may not access the Service.
                            </p>
                            <p>
                                You represent that you are over the age of 18.
                                The Company does not permit those under 18 to
                                use the Service.
                            </p>
                            <p>
                                Your access to and use of the Service is also
                                conditioned on Your acceptance of and compliance
                                with the Privacy Policy of the Company. Our
                                Privacy Policy describes Our policies and
                                procedures on the collection, use and disclosure
                                of Your personal information when You use the
                                Application or the Website and tells You about
                                Your privacy rights and how the law protects
                                You. Please read Our Privacy Policy carefully
                                before using Our Service.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Links to Other Websites
                            </h1>
                            <p>
                                Our Service may contain links to third-party web
                                sites or services that are not owned or
                                controlled by the Company.
                            </p>
                            <p>
                                The Company has no control over, and assumes no
                                responsibility for, the content, privacy
                                policies, or practices of any third party web
                                sites or services. You further acknowledge and
                                agree that the Company shall not be responsible
                                or liable, directly or indirectly, for any
                                damage or loss caused or alleged to be caused by
                                or in connection with the use of or reliance on
                                any such content, goods or services available on
                                or through any such web sites or services.
                            </p>
                            <p>
                                We strongly advise You to read the terms and
                                conditions and privacy policies of any
                                third-party web sites or services that You
                                visit.
                            </p>
                            <h1 className="text-2xl mt-8">Termination</h1>
                            <p>
                                We may terminate or suspend Your access
                                immediately, without prior notice or liability,
                                for any reason whatsoever, including without
                                limitation if You breach these Terms and
                                Conditions.
                            </p>
                            <p>
                                Upon termination, Your right to use the Service
                                will cease immediately.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Limitation of Liability
                            </h1>
                            <p>
                                Notwithstanding any damages that You might
                                incur, the entire liability of the Company and
                                any of its suppliers under any provision of this
                                Terms and Your exclusive remedy for all of the
                                foregoing shall be limited to the amount
                                actually paid by You through the Service or 100
                                USD if You haven't purchased anything through
                                the Service.
                            </p>
                            <p>
                                To the maximum extent permitted by applicable
                                law, in no event shall the Company or its
                                suppliers be liable for any special, incidental,
                                indirect, or consequential damages whatsoever
                                (including, but not limited to, damages for loss
                                of profits, loss of data or other information,
                                for business interruption, for personal injury,
                                loss of privacy arising out of or in any way
                                related to the use of or inability to use the
                                Service, third-party software and/or third-party
                                hardware used with the Service, or otherwise in
                                connection with any provision of this Terms),
                                even if the Company or any supplier has been
                                advised of the possibility of such damages and
                                even if the remedy fails of its essential
                                purpose.
                            </p>
                            <p>
                                Some states do not allow the exclusion of
                                implied warranties or limitation of liability
                                for incidental or consequential damages, which
                                means that some of the above limitations may not
                                apply. In these states, each party's liability
                                will be limited to the greatest extent permitted
                                by law.
                            </p>
                            <h1 className="text-2xl mt-8">
                                &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
                                Disclaimer
                            </h1>
                            <p>
                                The Service is provided to You &quot;AS IS&quot;
                                and &quot;AS AVAILABLE&quot; and with all faults
                                and defects without warranty of any kind. To the
                                maximum extent permitted under applicable law,
                                the Company, on its own behalf and on behalf of
                                its Affiliates and its and their respective
                                licensors and service providers, expressly
                                disclaims all warranties, whether express,
                                implied, statutory or otherwise, with respect to
                                the Service, including all implied warranties of
                                merchantability, fitness for a particular
                                purpose, title and non-infringement, and
                                warranties that may arise out of course of
                                dealing, course of performance, usage or trade
                                practice. Without limitation to the foregoing,
                                the Company provides no warranty or undertaking,
                                and makes no representation of any kind that the
                                Service will meet Your requirements, achieve any
                                intended results, be compatible or work with any
                                other software, applications, systems or
                                services, operate without interruption, meet any
                                performance or reliability standards or be error
                                free or that any errors or defects can or will
                                be corrected.
                            </p>
                            <p>
                                Without limiting the foregoing, neither the
                                Company nor any of the company's provider makes
                                any representation or warranty of any kind,
                                express or implied: (i) as to the operation or
                                availability of the Service, or the information,
                                content, and materials or products included
                                thereon; (ii) that the Service will be
                                uninterrupted or error-free; (iii) as to the
                                accuracy, reliability, or currency of any
                                information or content provided through the
                                Service; or (iv) that the Service, its servers,
                                the content, or e-mails sent from or on behalf
                                of the Company are free of viruses, scripts,
                                trojan horses, worms, malware, timebombs or
                                other harmful components.
                            </p>
                            <p>
                                Some jurisdictions do not allow the exclusion of
                                certain types of warranties or limitations on
                                applicable statutory rights of a consumer, so
                                some or all of the above exclusions and
                                limitations may not apply to You. But in such a
                                case the exclusions and limitations set forth in
                                this section shall be applied to the greatest
                                extent enforceable under applicable law.
                            </p>
                            <h1 className="text-2xl mt-8">Governing Law</h1>
                            <p>
                                The laws of the Country, excluding its conflicts
                                of law rules, shall govern this Terms and Your
                                use of the Service. Your use of the Application
                                may also be subject to other local, state,
                                national, or international laws.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Disputes Resolution
                            </h1>
                            <p>
                                If You have any concern or dispute about the
                                Service, You agree to first try to resolve the
                                dispute informally by contacting the Company.
                            </p>
                            <h1 className="text-2xl mt-8">
                                For European Union (EU) Users
                            </h1>
                            <p>
                                If You are a European Union consumer, you will
                                benefit from any mandatory provisions of the law
                                of the country in which you are resident in.
                            </p>
                            <h1 className="text-2xl mt-8">
                                United States Legal Compliance
                            </h1>
                            <p>
                                You represent and warrant that (i) You are not
                                located in a country that is subject to the
                                United States government embargo, or that has
                                been designated by the United States government
                                as a &quot;terrorist supporting&quot; country,
                                and (ii) You are not listed on any United States
                                government list of prohibited or restricted
                                parties.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Severability and Waiver
                            </h1>
                            <h2 className="text-xl mt-2">Severability</h2>
                            <p>
                                If any provision of these Terms is held to be
                                unenforceable or invalid, such provision will be
                                changed and interpreted to accomplish the
                                objectives of such provision to the greatest
                                extent possible under applicable law and the
                                remaining provisions will continue in full force
                                and effect.
                            </p>
                            <h2 className="text-xl mt-2">Waiver</h2>
                            <p>
                                Except as provided herein, the failure to
                                exercise a right or to require performance of an
                                obligation under this Terms shall not effect a
                                party's ability to exercise such right or
                                require such performance at any time thereafter
                                nor shall be the waiver of a breach constitute a
                                waiver of any subsequent breach.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Translation Interpretation
                            </h1>
                            <p>
                                These Terms and Conditions may have been
                                translated if We have made them available to You
                                on our Service. You agree that the original
                                English text shall prevail in the case of a
                                dispute.
                            </p>
                            <h1 className="text-2xl mt-8">
                                Changes to These Terms and Conditions
                            </h1>
                            <p>
                                We reserve the right, at Our sole discretion, to
                                modify or replace these Terms at any time. If a
                                revision is material We will make reasonable
                                efforts to provide at least 30 days' notice
                                prior to any new terms taking effect. What
                                constitutes a material change will be determined
                                at Our sole discretion.
                            </p>
                            <p>
                                By continuing to access or use Our Service after
                                those revisions become effective, You agree to
                                be bound by the revised terms. If You do not
                                agree to the new terms, in whole or in part,
                                please stop using the website and the Service.
                            </p>
                            <h1 className="text-2xl mt-8">Contact Us</h1>
                            <p>
                                If you have any questions about these Terms and
                                Conditions, You can contact us:
                            </p>
                            <ul>
                                <li>By email: admin@arknihgts.one</li>
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}
