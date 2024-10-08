import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

function SidebarOptions({href, id}: {
    href: string;
    id: string;
}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    // To know if the document is currently open i.e. the browser is in the document path
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== "/";

    if(!data) return null;

  return (
    <Link href={href} className={`border p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
    }`}>
        {/* truncate class is for adding ... if the title is too big */}
        <p className="truncate">{data.title}</p>
    </Link>
  )
}

export default SidebarOptions