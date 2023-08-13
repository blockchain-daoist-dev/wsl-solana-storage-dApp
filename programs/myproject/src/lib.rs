use anchor_lang::prelude::*;

declare_id!("8rSsbrdRfV3PnsTZA7JxYoh9gVubAR45mzqta9raib8T");

#[program]
pub mod frcnt {
     use super::*; 
     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello Solana!");
        Ok(())
     }
}

#[derive(Accounts)]
pub struct Initialize {}
