use anchor_lang::prelude::*;

declare_id!("B1oXQn9bM35wGjMd7tcvmafhy7DHkfNUtcKZ6U9p4giL");

#[program]
pub mod myproject {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
