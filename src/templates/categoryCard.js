import React from 'react';
import { ThemedListGroup, ThemedListItem } from '../components/ThemedList';
import Link from "gatsby-link";
import { ThemedCard, ThemedCardHeader } from "../components/ThemedCard";
import styled from "styled-components";

const MyLink = styled(Link)`
	color: ${props => props.theme.textColor()};
`;

export default ({name, entries}) => {
	return (
		<ThemedCard>
			<ThemedCardHeader>{name.charAt(0).toUpperCase()}{name.slice(1)}s</ThemedCardHeader>
			<ThemedListGroup>
				{entries.map(({name, fields: {slug}}) =>
					<ThemedListItem key={slug}>
						<MyLink to={slug}>
							{name.charAt(0).toUpperCase()}{name.slice(1)}
						</MyLink>
					</ThemedListItem>
				)}
			</ThemedListGroup>
		</ThemedCard>
	);
}
