/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { UserService } from '../../../../modules/demo/service/UserService';
import { Demo } from '@/types';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import axios from 'axios';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Crud = () => {
    let emptyUser: Demo.User = {
        id: 0,
        name: '',
        email: '',
        password: '',
        role: '',
        lastSeen: new Date().toISOString(),
        messages: []
    };
    

    const [users, setUsers] = useState<Demo.User[] | null>(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState<Demo.User>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState<Demo.User[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    
    const roleOptions = [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'LAB_TECHNICIAN', value: 'LAB_TECHNICIAN' },
        { label: 'QUALITY_MANAGER', value: 'QUALITY_MANAGER' },
        { label: 'HOSPITAL_TECHNICIAN', value: 'HOSPITAL_TECHNICIAN' }
    ];

    useEffect(() => {
        const userService = new UserService();
        userService.getUsers().then((data: Demo.User[]) => setUsers(data));
    }, []);

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const saveUser = () => {
        setSubmitted(true);

        if (user.name.trim()) {
            let _users = [...(users || [])]; // Use an empty array if users is null
            let _user = { ...user };
            const userService = new UserService();
            if (user.id) {
                userService.updateUser(_user).then(() => {
                    const index = findIndexById(user.id);
                    _users[index] = _user;
                    setUsers(_users as any);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Updated',
                        life: 3000
                    });
                });
            } else {
                _user.id = createNumericId();
                userService.createUser(_user).then(() => {
                    _users.push(_user);
                    setUsers(_users as any);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Created',
                        life: 3000
                    });
                });
            }

            setUserDialog(false);
            setUser(emptyUser);
        }
    };

    const editUser = (user: Demo.User) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteUser = (user: Demo.User) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        const userService = new UserService();
        userService.deleteUser(user.id).then(() => {
            let _users = (users || [])?.filter((val: any) => val.id !== user.id);
            setUsers(_users);
            setDeleteUserDialog(false);
            setUser(emptyUser);
            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'User Deleted',
                life: 3000
            });
        });
    };

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < (users || [])?.length; i++) {
            if ((users as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createNumericId = () => {
        return Math.floor(Math.random() * 100000);
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedUsers = () => {
        let _users = (users || [])?.filter((val: any) => !(selectedUsers as any)?.includes(val));
        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Users Deleted',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DropdownChangeEvent, name: string) => {
        const val = (e.target && e.target.value) || (e as DropdownChangeEvent).value || '';
        let _user = { ...user };
        _user[`${name}`] = val;
    
        setUser(_user);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !(selectedUsers as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const nameBodyTemplate = (rowData: Demo.User) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const emailBodyTemplate = (rowData: Demo.User) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const roleBodyTemplate = (rowData: Demo.User) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.role}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.User) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUser} />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedUsers} />
        </>
    );
    const updateUserRole = async (userId: string, newRole: string) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await axios.put(
                `http://localhost:8080/users/${userId}/role`,
                { role: newRole }, // Send the role in the body
                {
                    headers: {
                        Authorization: `${token}` // Add the token to the request headers
                    }
                }
            );
            console.log('User role updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };
    
    const handleRoleChange = (e: DropdownChangeEvent) => {
        const newRole = e.value;
        const userId = user.id; 
        updateUserRole(userId.toString(), newRole);
        onInputChange(e, 'role'); // Update the local state as well
    };
    

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e) => setSelectedUsers(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={globalFilter}
                        emptyMessage="No users found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '20rem' }}></Column>
                        <Column field="role" header="Role" sortable body={roleBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Dialog visible={userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={user.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !user.name
                                })}
                            />
                            {submitted && !user.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="role">Role</label>
                            <Dropdown
                                id="role"
                                value={user.role}
                                options={roleOptions}
                                onChange={handleRoleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <InputText
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => onInputChange(e, 'password')}
                                required
                                className={classNames({
                                    'p-invalid': submitted && !user.password
                                })}
                            />
                            {submitted && !user.password && <small className="p-invalid">Password is required.</small>}
                        </div>
                    </Dialog>
                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Are you sure you want to delete <b>{user.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete the selected users?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;