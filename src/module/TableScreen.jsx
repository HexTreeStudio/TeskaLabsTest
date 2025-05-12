import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { DataTableCard2, DateTime } from 'asab_webui_components';
import { Link } from 'react-router-dom';
import "../tablescreen.css"

export function TableScreen(props) {
	const { t } = useTranslation();

	const loader = async ({params}) => {
		let response = await fetch(`https://devtest.teskalabs.com/data`).then((res)=>{if(res.ok) return res.json()});
		const rows = response.data.slice((params.p - 1) * params.i, params.p * params.i);
		const count = response.count;
		return { count, rows } ;
	}

	const columns = [
		{
			title: t("Training|Username"),
			thStyle: {minWidth: "20rem"},
			render: ({ row }) =>
				<Link to={`detail/${row.id}`} className='cel_credentials'>
					<span className='row_username'>
						{row.username}
					</span>
					<span className='row_id'>
						{row.id}
					</span>
				</Link>
		},
		{
			title: "Email",
			thStyle: {minWidth: "2rem"},
			render: ({ row }) =>
				<span>
					{row.email}
				</span>
		},
		{
			title: t("Training|Created at"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.created}/>
		},
		{
			title: t("Training|Expected expiration"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.last_sign_in}/>
			
		},
		{
			title: t("Training|Address"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <span>
					{row.address}
				</span>
			
		}
	];


	return (
		<Container className='h-100'>
			<DataTableCard2 columns={columns} loader={loader} header={<Header />}/> 
		</Container>
	);
}

const Header = () => {
	const { t } = useTranslation();
	return	(<>
		<div className="flex-fill">
			<h3>
				<i className="bi bi-stopwatch pe-2"></i>
				{t("Training|Sessions")}
			</h3>
		</div>
		
	</>);
}
