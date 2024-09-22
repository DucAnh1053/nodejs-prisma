/* eslint-disable @next/next/no-img-element */
'use client';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import { useUser } from '../../context/usercontext';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="grid">

        </div>
    );
};

export default Dashboard;
