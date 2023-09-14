// components/Breadcrumb.js
import React, { useEffect, useState } from 'react';

const Breadcrumb = ({ urlPath }) => {
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const pathSegments = urlPath.split('/').filter(Boolean);

    // Generate the breadcrumb
    let breadcrumbItems = [];
    let pathSoFar = '';
    pathSegments.forEach((segment, index) => {
        pathSoFar += `/${segment}`;
        const link = index === pathSegments.length - 1 ? null : pathSoFar;
        const item = capitalize(segment);
        breadcrumbItems.push({ link, item });
    });

    return (
        <nav className="text-[0.82rem]">
            <ol className="list-none text-gray-700 p-0 flex bg-purple-50 border border-purple-500/40  px-4 py-[5px] rounded-[3rem] ">
                <li>
                    <a href="/" className="text-violet-400 font-medium ">
                        Home
                    </a>
                </li>
                <li className="mx-[5px]">/</li>
                <li className="flex">
                    {breadcrumbItems.map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            {breadcrumb.link ? (
                                <>
                                    <a href={breadcrumb.link} className="text-violet-400 font-medium ">
                                        {breadcrumb.item}
                                    </a>
                                    <span className="mx-[5px]">/</span>
                                </>
                            ) : (
                                <span className="font-semibold text-gray-500 ">{breadcrumb.item}</span>
                            )}
                        </React.Fragment>
                    ))}
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
