import React, { useState } from 'react'
import styled from 'styled-components'
import woman from '../../img/woman.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'

function Navigation({active, setActive}) {
    
    return (
        <NavStyled>
            <div className="user-con">
                <img src={woman} alt="" />
                <div className="text">
                    <h2>Olivia Charlotte</h2>
                    <p>Finance Manager</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 105%;
    background: rgba(30, 21, 74, 0.97);
    //background:#D9D9D9;
    //background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    //border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        //margin-top: -10px;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: white;
            //color: rgba(34, 34, 96, 1);
        }
        p{
            //color: rgba(34, 34, 96, .6);
            color: white;
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            //color: rgba(34, 34, 96, .6);
            color: white;
            padding-left: 1rem;
            position: relative;
            i{
                //color: rgba(34, 34, 96, 0.6);
                color: white;
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        //color: rgba(34, 34, 96, 1) !important;
        color:rgb(155, 152, 152) !important;
        i{
            color:rgb(155, 152, 152) !important;
            //color: red;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            //background: #222260;
            background: rgb(155, 152, 152);
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav{
        color: white;
        margin-left: 12px;
        margin-bottom: 12px;
    }
`;

export default Navigation